import { processDue, requireAdmin } from "../../../campaign-engine/service";

export async function POST(request: Request) {
  try {
    requireAdmin(request);
    const body = (await request.json()) as { limit?: number; dryRun?: boolean };
    const origin = new URL(request.url).origin;
    const result = await processDue({ origin, limit: body.limit, dryRun: body.dryRun });
    return Response.json(result);
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "process_failed" }, { status: 500 });
  }
}
