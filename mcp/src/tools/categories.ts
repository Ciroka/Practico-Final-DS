import { any, z } from "zod";
import { api } from "../api-client";
import type { ToolDef } from "../tool-factory";

export default [
    {
        name: "list_categories",
        description: "Listar todas",
        handler: async () => api.get("/categories"),
    },
    {
        name: "get_category",
        description: "Obtener una",
        inputSchema: {id: z.number().int()},
        handler: async ({id}: any) => api.get(`/categories/${id}`),
    },
    {
        name: "create_category",
        description: "Crear",
        inputSchema: {name: z.string().min(2).max(100)},
        handler: async (body: any) => api.post("/categories", body)
    },
    {
        name: "update_categories",
        description: "Actualizar",
        inputSchema: {
            id: z.number().int(),
            name: z.string().min(2).max(100).optional(),
        },
        handler: async ({id ,...body}: any) => api.patch(`/products/${id}`, body)
    },
    {
        name: "delete_categories",
        description: "Eliminar",
        inputSchema: {id: z.number().int()},
        handler: async ({id}: any) => api.del(`/categories/${id}`)
    }
] as ToolDef[];