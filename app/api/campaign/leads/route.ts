import { importLeads, requireAdmin, updateLeadStatus } from "../../../campaign-engine/service";

export async function POST(request: Request) {
  try {
    requireAdmin(request);
    const body = (await request.json()) as { leads?: unknown };
    if (!Array.isArray(body.leads)) {
      return Response.json({ error: "leads must be an array" }, { status: 400 });
    }
    const result = await importLeads(body.leads as Parameters<typeof importLeads>[0]);
    return Response.json(result);
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "lead_import_failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    requireAdmin(request);
    const body = (await request.json()) as { id?: string; email?: string; status?: string; detail?: string };
    if (!body.status || (!body.id && !body.email)) {
      return Response.json({ error: "id or email and status are required" }, { status: 400 });
    }
    const result = await updateLeadStatus({
      id: body.id,
      email: body.email,
      status: body.status,
      detail: body.detail,
    });
    return Response.json(result, { status: result.ok ? 200 : 404 });
  } catch (error) {
    if (error instanceof Response) return error;
    return Response.json({ error: "lead_update_failed" }, { status: 500 });
  }
}
