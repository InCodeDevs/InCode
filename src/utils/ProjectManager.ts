/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {UIManager} from "./UIManager";
import * as Blockly from 'blockly'

export class ProjectManager {

    private static currentProject: object = {}

    /**
     * Creates a blank Project
     * @param name The name of the Project
     * @param type The Editor type of the Project (monaco or blockly)
     * @param code The starter code of the Project (used for templates)
     * @return True if the creation was successful
     */
    public static createProject(name: string, type: string = 'monaco', code: string = ''): boolean {
        if (localStorage.getItem("incode-editor.projects." + name) == null) {
            localStorage.setItem("incode-editor.projects." + name, JSON.stringify({
                name: name,
                code: code,
                type: type
            }));
            return true
        } else {
            return false
        }
    }

    /**
     * Opens an existing Project
     * @param name The name of the Project
     * @param editor The editor which should be opened ("monaco" (default) or "blockly")
     */
    public static openProject(name: string, editor: string = "monaco"): boolean {
        if (localStorage.getItem("incode-editor.projects." + name) != null) {
            UIManager.hideMenu();
            UIManager.showMenuBar();
            if (editor === 'monaco') {
                UIManager.createMonaco();
                // @ts-ignore
                window.editor.setValue(JSON.parse(localStorage.getItem("incode-editor.projects." + name)).code);
            } else {
                UIManager.createBlockly();
                Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(JSON.parse(localStorage.getItem("incode-editor.projects." + name) as string).code), Blockly.getMainWorkspace());
            }
            return true
        } else {
            return false;
        }
    }

    /**
     * Check if a project exists
     * @param name The name of the project
     * @return True if the project exists
     */
    public static doesProjectExist(name: string): boolean {
        return localStorage.getItem("incode-editor.projects." + name) != null
    }

    /**
     * Saves a project
     * @param name The name of the Project that should be saved
     * @param code The code of the Project
     */
    public static saveProject(name: string, code: string) {
        localStorage.setItem("incode-editor.projects." + name,
            JSON.stringify(
                {
                    name: JSON.parse(localStorage.getItem("incode-editor.projects." + name) as string).name,
                    code: code,
                    type: JSON.parse(localStorage.getItem("incode-editor.projects." + name) as string).type,
                })
        );
    }

    /**
     * Renames an existing Project
     * @param name The current name of the Project
     * @param newName The new name of the Project
     * @param code The code of the Project
     */
    public static renameProject(name: string, newName: string, code: string) {
        ProjectManager.deleteProject(name);
        ProjectManager.createProject(newName);
        ProjectManager.saveProject(newName, code);
    }

    /**
     * Deletes an existing Project
     * @param name The name of the Project
     */
    public static deleteProject(name: string) {
        localStorage.removeItem("incode-editor.projects." + name);
    }

    /**
     * Get the Editor Type of a Project
     * @param name The name of the Project
     * @return 'monaco' or 'blockly'
     */
    public static getProjectType(name: string): string {
        return JSON.parse(localStorage.getItem("incode-editor.projects." + name) as string).type || null
    }

}
