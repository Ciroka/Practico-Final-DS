import { z } from "zod";
import { api } from "../api-client";
import type { ToolDef } from "../tool-factory";

export default [
    {
        name: "list_users",
        description: "Listar usuarios",
        handler: async () => api.get("/users")
    },
    {
        name: "update_user_role",
        description: "Cambiar rol",
        inputSchema: {
            id: z.uuid(),
            rol: z.enum(["admin", "user"])
        },
        handler: async ({ id, ...body }: any) => api.patch(`/users/${id}/role`, body) //decia post en vez de dpatch
    },
    {
        name: "update_my_password",
        description: "Cambiar contraseña",
        inputSchema: {
            currentPassword: z.string(),
            newPassword: z.string().min(8),
        },
        handler: async (body: any) => api.patch("/users/me/password", body)
    },
    {
        name: "update_my_email",
        description: "Cambiar email",
        inputSchema: {
            newEmail: z.email(),
            password: z.string(),
        },
        handler: async (body: any) => api.patch("/users/me/email", body)
    }
] as ToolDef[];