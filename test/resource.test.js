const {Roter} = require("express");
const app = require("../app.js");
//import Resource from "../models/Resource.js";
const {
    addResource,
    updateResource,
    deleteResource,
    getResource,
    getResources,
} = require ("../controllers/resourceController.js");

const router = Router();

router.post("/", addResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);
router.get("/:id", getResource);
router.get("/", getResources);

describe('Resource API Testing...', () => {
    it('addResource(post) API test case --->', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/api/resource',
            payload: {
                resourceType: 'Type',
                brand: 'Brand',
                quantity: 10,
                roomNumber: 101,
            },
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(
            expect.objectContaining({
                resourceType: expect.any(String),
                brand: expect.any(String),
                quantity: expect.any(Number),
                roomNumber: expect.any(Number),
            })
        );
    });

    it('updateResource(put) API test --->', async () => {
        const response = await app.inject({
            method: 'PUT',
            url: '/api/resource/65fc5b8edc6a16f9781ac955',
            payload: {
                resourceType: 'Updated Type',
                brand: 'Updated Brand',
                quantity: 15,
                roomNumber: 102,
            },
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(
            expect.objectContaining({
                resourceType: expect.any(String),
                brand: expect.any(String),
                quantity: expect.any(Number),
                roomNumber: expect.any(Number),
            })
        );
    });

    it('deleteResource(delete) API test --->', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: '/api/resource/65fc5b8edc6a16f9781ac955',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(
            expect.objectContaining({
                message: 'Resource deleted successfully',
            })
        );
    });

    it('getResource(get) API test --->', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/resource/65fc5b8edc6a16f9781ac955',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(
            expect.objectContaining({
                resourceType: expect.any(String),
                brand: expect.any(String),
                quantity: expect.any(Number),
                roomNumber: expect.any(Number),
            })
        );
    });

    it('getResources(get) API test --->', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/resource',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    resourceType: expect.any(String),
                    brand: expect.any(String),
                    quantity: expect.any(Number),
                    roomNumber: expect.any(Number),
                })
            ])
        );
    });
});
