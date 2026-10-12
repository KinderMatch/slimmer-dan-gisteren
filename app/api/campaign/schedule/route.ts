import { requireAdmin, scheduleCampaign } from "../../../campaign-engine/service";

export async function POST(request: Request) {
  try {
    requireAdmin(request);
    const body = (await request.json()) as { startDate?: string; sendTime?: string; campaignSlug?: string };
    if (!body.startDate) {
      return Response.json({ error: "startDate is required" }, { status: 400 });
    }
    const result = await scheduleCampaign({
      startDate: body.startDate,
      sendTime: body.sendTime,
      campaignSlug: body.campaignSlug,
    });
    return Response.json(result);
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "schedule_failed" }, { status: 500 });
  }
}
