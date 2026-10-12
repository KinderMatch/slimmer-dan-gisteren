import { listCampaignState, requireAdmin } from "../../../campaign-engine/service";

export async function GET(request: Request) {
  try {
    requireAdmin(request);
    const result = await listCampaignState();
    return Response.json(result);
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "state_failed" }, { status: 500 });
  }
}
