import { App, Modal, Notice } from 'obsidian';


class ConfirmDialog extends Modal {
    onConfirm: () => void;
    text: string;

    constructor(app: App, text: string, onConfirm: () => void) {
        super(app);
        this.onConfirm = onConfirm;
        this.text = text;
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl('h3', { text: this.text });

        // Yes Button
        const yesButton = contentEl.createEl('button', {
            text: 'Yes',
            cls: 'mod-cta',
        });
        yesButton.addEventListener('click', () => {
            this.onConfirm();
            new Notice('Confirmed');
            this.close();
        });

        // No Button
        const noButton = contentEl.createEl('button', {
            text: 'No',
        });
        noButton.addEventListener('click', () => {
            this.close();
        });
    }

    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}

export class ConfirmPatternDeletionModal extends ConfirmDialog {
    constructor(app: App, onConfirm: () => void) {
        super(app, "You sure want delete Pattern ?", onConfirm);
    }
}

export default ConfirmDialog;