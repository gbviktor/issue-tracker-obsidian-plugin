import { IssueTrackerPattern } from 'components/PluginsSettings';
import RegexMarkdownParser from 'components/RegexMarkdownParser';
import IssueTrackerMain from 'main';
import { App, Modal, Notice, Setting } from 'obsidian';

export class EditIssueTrackerPatternModal extends Modal {

    pattern: IssueTrackerPattern;
    onChange: (changed: IssueTrackerPattern) => void;

    constructor(app: App, pattern: IssueTrackerPattern, onChange: (changed: IssueTrackerPattern) => void) {
        super(app);
        this.pattern = pattern;
        this.onChange = onChange;
    }

    private previewEl: HTMLElement;

    onOpen() {
        const { contentEl } = this;
        const pattern = this.pattern;

        contentEl.createEl('h2', { text: 'Issue Tracker Pattern' });

        // Create fields and set their initial values
        new Setting(contentEl)
            .setName('Name')
            .setDesc('Enter a unique name for the pattern')
            .addText(text => text
                .onChange((value) => {
                    pattern.name = value;
                    this.updatePreview();
                })
                .setValue(pattern.name)).settingEl;

        new Setting(contentEl)
            .setName('Parsing Regular Expression')
            .setDesc('Enter the regular expression for parsing')
            .addText(text => text
                .onChange((value) => {
                    pattern.regex = value;
                    this.updatePreview();
                })
                .setValue(pattern.regex))
            .settingEl;

        new Setting(contentEl)
            .setName('Result URL')
            .setDesc('Enter the URL with $1, $2, etc. for regex groups')
            .addText(text => text
                .onChange((value) => {
                    pattern.url = value;
                    this.updatePreview();
                })
                .setValue(pattern.url))
            .settingEl;

        new Setting(contentEl)
            .setName('Test Message')
            .setDesc('Enter a message to test the regular expression')
            .addTextArea(text => text
                .onChange((value) => {
                    pattern.test = value;
                    this.updatePreview();
                })
                .setValue(pattern.test))
            .settingEl;

        // Create a preview element
        this.previewEl = contentEl.createEl('div');
        this.updatePreview();

        // Add save button
        contentEl.createEl('button', {
            text: 'Save Pattern',
            cls: 'mod-cta',
        }).onClickEvent(() => {
            // Logic to save the new pattern
            // Validate inputs, update settings, and close modal
            // Save the changes to the pattern
            this.onChange(pattern);

            new Notice('Pattern successfully saved');
            this.close();
        });
    }

    // Method to update the preview
    updatePreview() {
        try {
            const parser = new RegexMarkdownParser(this.pattern.regex, this.pattern.url);
            const previewText = parser.parse(this.pattern.test);
            this.previewEl.innerHTML = `Preview: ${previewText}`;
        } catch (e) {
            this.previewEl.textContent = 'Invalid regular expression';
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

export class AddNewIssueTrackerPatternModal extends EditIssueTrackerPatternModal {
    constructor(app: App, onCreated: (created: IssueTrackerPattern) => void) {
        super(app, {
            name: "",
            regex: "[]",
            url: "",
            test: "",
        }, (changed) => {
            onCreated(changed)
        });
    }
}