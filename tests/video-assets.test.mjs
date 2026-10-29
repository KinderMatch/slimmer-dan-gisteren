import assert from "node:assert/strict";
import { open, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

// Durations of the original films: these must never become short previews.
const films = {
  "campaigns/zb-schilder.mp4": 20,
  "campaigns/zb-hondenhok.mp4": 20,
  "campaigns/zb-auto.mp4": 20,
  "campaigns/gym-republic.mp4": 41.41,
  "campaigns/massaclaim-airbnb.mp4": 109.93,
  "campaigns/daelenbroek.mp4": 179.28,
  "wedding/full/nordin-kyra-full.mp4": 348.07,
};

async function movieMetadata(path) {
  const file = await open(path);
  try {
    const { size } = await file.stat();
    const boxes = [];
    let moov;
    for (let offset = 0; offset + 8 <= size;) {
      const header = Buffer.alloc(16);
      await file.read(header, 0, 16, offset);
      let length = header.readUInt32BE();
      let headerSize = 8;
      if (length === 1) { length = Number(header.readBigUInt64BE(8)); headerSize = 16; }
      if (length === 0) length = size - offset;
      assert.ok(length >= headerSize && offset + length <= size, "Invalid MP4 box");
      const type = header.toString("ascii", 4, 8);
      boxes.push(type);
      if (type === "moov") {
        moov = Buffer.alloc(length - headerSize);
        await file.read(moov, 0, moov.length, offset + headerSize);
      }
      offset += length;
    }
    assert.ok(moov, "Missing movie metadata");
    let seconds;
    for (let offset = 0; offset + 8 <= moov.length;) {
      const length = moov.readUInt32BE(offset);
      assert.ok(length >= 8 && offset + length <= moov.length);
      if (moov.toString("ascii", offset + 4, offset + 8) === "mvhd") {
        const body = moov.subarray(offset + 8, offset + length);
        seconds = body[0] === 1
          ? Number(body.readBigUInt64BE(24)) / body.readUInt32BE(20)
          : body.readUInt32BE(16) / body.readUInt32BE(12);
      }
      offset += length;
    }
    return { boxes, moov, seconds, size };
  } finally { await file.close(); }
}

test("owned campaign videos and wedding film retain full length and streamable MP4 encoding", async () => {
  for (const [path, duration] of Object.entries(films)) {
    const { boxes, moov, seconds, size } = await movieMetadata(`public/assets/${path}`);
    assert.equal(boxes[0], "ftyp", path);
    assert.ok(boxes.indexOf("moov") < boxes.indexOf("mdat"), `${path}: metadata must load before video data`);
    assert.ok(moov.includes(Buffer.from("avc1")), `${path}: H.264 video required`);
    assert.ok(moov.includes(Buffer.from("mp4a")), `${path}: AAC audio required`);
    assert.ok(Math.abs(seconds - duration) < 0.2, `${path}: full original duration required, got ${seconds}`);
    assert.ok(size < 100 * 1024 * 1024, `${path}: exceeds hosting file limit`);
  }
});

test("website code contains no retired WordPress video dependencies", async () => {
  async function check(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await check(path);
      else if (/\.tsx?$/.test(entry.name)) {
        assert.doesNotMatch(await readFile(path, "utf8"), /https?:\/\/videos\.files\.wordpress\.com/i, path);
      }
    }
  }
  await check("app");
});
