import { any, z } from "zod";
import { api } from "../api-client";
import type { ToolDef } from "../tool-factory";

export default [
    {
        name: "list_products",
        description: "Listar con filtros y paginación",
        inputSchema: {
            name: z.string().optional(),
            order: z.enum(["ASC", "DESC"]).optional(),
            sortBy: z.enum(["id", "name", "price", "stock"]).optional(),
            page: z.number().int().min(1).optional(),
            limit: z.number().int().min(1).max(100).optional()
        },
        handler: async (params: any) => api.get("/products", {params}),
    },
    {
        name: "get_product",
        description: "Obtener uno",
        inputSchema: {id: z.number().int()},
        handler: async ({id}: any) => api.get(`/products/${id}`),
    },
    {
        name: "create_product",
        description: "Crear",
        inputSchema: {
            name: z.string().min(2).max(100),
            price: z.number().positive(),
            stock: z.number().int().min(0),
            categoryId: z.number().int().optional()
        },
        handler: async (body: any) => api.post("/products", body)
    },
    {
        name: "update_products",
        description: "Actualizar",
        inputSchema: {
            id: z.number().int(),
            name: z.string().min(2).max(100).optional(),
            price: z.number().positive().optional(),
            stock: z.number().int().min(0).optional(),
            categoryId: z.number().int().optional()
        },
        handler: async ({id ,...body}: any) => api.put(`/products/${id}`, body)
    },
    {
        name: "delete_products",
        description: "Eliminar",
        inputSchema: {id: z.number().int()},
        handler: async ({id}: any) => api.del(`/products/${id}`)
    }
] as ToolDef[];