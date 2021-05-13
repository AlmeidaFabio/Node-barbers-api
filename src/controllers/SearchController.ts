import { Request, Response } from "express";
import { SearchService } from "../services/SearchService";

export class SearchController {
    async search(request:Request, response:Response) {
        const searchService = new SearchService();

        const {text} = request.body;

        try {
            if(text) {
                const result = await searchService.searchBarber(text);

                return response.status(200).json(result);
            }
        } catch (err) {
            return response.status(401).json({ error: err });
        }
    }
}