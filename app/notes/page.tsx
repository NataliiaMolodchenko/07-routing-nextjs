import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./filter/[...slug]/Notes.client";

const PER_PAGE = 12;

export default async function NotesPage() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, ""],
        queryFn: () => fetchNotes(1, PER_PAGE, undefined),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    );
}