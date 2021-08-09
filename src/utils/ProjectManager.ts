/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */
import {UIManager} from "./UIManager";

export class ProjectManager {

    private static currentProject: object = {}

    /**
     * Creates a blank Project
     * @param name The name of the Project
     */
    public static createProject(name: string): boolean {
        if (localStorage.getItem("incode-editor.projects." + name) == null) {
            localStorage.setItem("incode-editor.projects." + name, JSON.stringify({
                name: name,
                code: ""
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
            UIManager.createMonaco();
            // @ts-ignore
            window.editor.setValue(JSON.parse(localStorage.getItem("incode-editor.projects." + name)).code);
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
                    code: code
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
     * @return The current Project or "" if no project is open
     */
    public static getCurrentProjectName(): object {
        return this.currentProject;
    }

}
