import { superTokensNextWrapper } from "supertokens-node/nextjs";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import supertokens from "supertokens-node";
import { backendConfig } from "@/config/backendConfig";
import { profiloService } from "@/config/appInfo";

supertokens.init(backendConfig());

export default async function connector(req, res) {
    await superTokensNextWrapper(
        async (next) => {
            return await verifySession()(req, res, next);
        },
        req,
        res
    );

    try {
        const externalApiUrl = `${profiloService.domain}connector/test`;

        // Define custom headers
        const headers = {
            // Add your custom headers here
            "x-api-key": profiloService.apikey,
            "x-authorization": req.session.getUserId(),
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000/',
            origin: 'http://localhost:3000/',
            cache: 'no-store'
        };

        const response = await fetch(externalApiUrl, {
            method: "GET", // You can change the HTTP method as needed
            headers: headers,
        });

        if (!response.ok) {
            throw new Error("Request to external API failed");
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "An error occurred while fetching data from the external API." });
    }
}
