import IssueTrackerMain from 'main';
import { App, PluginSettingTab } from 'obsidian';
import { AddNewIssueTrackerPatternModal, EditIssueTrackerPatternModal } from './modals/AddNewIssueTrackerPatternModal';
import { ConfirmPatternDeletionModal } from './modals/ConfirmModal';


class MySettingTab extends PluginSettingTab {
    plugin: IssueTrackerMain;

    constructor(app: App, plugin: IssueTrackerMain) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Issue Tracker Patterns' });

        // List Patterns
        this.plugin.settings.patterns.forEach((pattern, index) => {

            let patternDiv = containerEl.createDiv();
            patternDiv.createEl('span', { text: pattern.name });

            patternDiv.createEl('button', {
                text: 'Edit',
            }).onClickEvent(() => {
                const editModal = new EditIssueTrackerPatternModal(this.app, pattern, (changed) => {
                    this.plugin.SavePattern(changed, index);
                    this.display();
                });
                editModal.open();
            });

            patternDiv.createEl('button', {
                text: 'Delete',
            }).onClickEvent(() => {
                const confirmModal = new ConfirmPatternDeletionModal(this.app,
                    () => {
                        this.plugin.DeletePatter(index);
                        this.display();
                    });
                confirmModal.open();
            });

        });

        containerEl.createEl('h2', { text: '' });

        // Add New Pattern Button
        containerEl.createEl('button', {
            text: 'Add New Pattern',
            cls: 'mod-cta',
        }).onClickEvent(() => {
            try {
                const modal = new AddNewIssueTrackerPatternModal(this.app, (created) => {
                    this.plugin.AddPattern(created);
                    this.display();
                });
                modal.open();
            }
            catch {

            }
        });

    }
}

export default MySettingTab;