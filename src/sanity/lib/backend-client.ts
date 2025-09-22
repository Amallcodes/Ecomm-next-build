import {createClient} from "next-sanity"
import {apiVersion, dataset, projectId} from "../env"

//  npm install next-sanity@canary
export const backendClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // set to false if statically geneerating pages using ISR or tag based revalidation
    token: process.env.SANITY_API_TOKEN
})