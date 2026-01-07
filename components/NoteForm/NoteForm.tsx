'use client';

import { ErrorMessage, Field, Form, Formik } from "formik";
import { createNote, type CreateNotePayload } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css"
import * as Yup from "yup"
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteFormProps{
    onCancel: () => void;
}

const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object({
    title: Yup.string().min(3).max(50).required("Required"),
    content: Yup.string().max(500, "Max 500 characters"),
    tag: Yup.mixed<NoteTag>().oneOf(tags).required("Required"),
});

function NoteForm({ onCancel }: NoteFormProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateNotePayload) => createNote(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["notes"] });
            onCancel();
        }
    });

    const initialValues: CreateNotePayload = {
    title: "",
    content: "",
    tag: "Todo",
  };

return (
    <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => mutation.mutate(values)}
        >
    <Form className={css.form}>
    <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <Field id="title" type="text" name="title" className={css.input} />
        <ErrorMessage name="title" className={css.error} component="span"/>
    </div>

    <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <Field
        as="textarea"
        id="content"
        name="content"
        rows={8}
        className={css.textarea}
        />
        <ErrorMessage name="content" className={css.error} component="span"/>
    </div>

    <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <Field as="select" id="tag" name="tag" className={css.select}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
        </Field>
        <ErrorMessage name="tag" className={css.error} component="span"/>
    </div>

    <div className={css.actions}>
        <button
         type="button"
         className={css.cancelButton}
         onClick={onCancel}>
        Cancel
        </button>
        <button
         type="submit"
         className={css.submitButton}
         disabled={mutation.isPending}
        >
          Create note
        </button>
    </div>
    </Form>    
            
    </Formik>
)
}

export default NoteForm;