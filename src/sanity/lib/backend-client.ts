import {createClient} from "next-sanity"
import {apiVersion, dataset, projectId} from "../env"

//  npm install next-sanity@canary
export const backendClient = createClient({
    projectId,
    dataset,
    apiVersion,
    // Must be false for write operations (mutations) to reach the Content Lake
    useCdn: false,
    token: process.env.SANITY_API_TOKEN
})