import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css"

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
    const { id } = await params;
    const note = await fetchNoteById(id);
    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;
    
    return (
        <NotePreview>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                    <span className={css.tag}>{note.tag}</span>
                </div>

                <p className={css.content}>{note.content}</p>

                <p className={css.date}>{formattedDate}</p>
            </div>
        </NotePreview>
    );
};