'use client';
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

type Props = {
    children: React.ReactNode;
};

function NotePreview({ children }: Props) {
    const router = useRouter();
    const close = () => router.back();

    return (
        <Modal onClose={close}>
            <div className={css.container}>{children}</div>
        </Modal>
    );

}

export default NotePreview;