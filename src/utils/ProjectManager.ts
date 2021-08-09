/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class ProjectManager {

    private static currentProject: object = {}

    /**
     * Creates a blank Project
     * @param name The name of the Project
     */
    public static createProject(name: string) {
        localStorage.setItem("incode-editor.projects." + name, JSON.stringify({
            name: name,
            code: ""
        }));
        this.currentProject = JSON.parse(<string>localStorage.getItem("incode-editor.projects." + name));
    }

    /**
     * Opens an existing Project
     * @param name The name of the Project
     * @param editor The editor which should be opened ("monaco" (default) or "blockly")
     */
    public static openProject(name: string, editor: string = "monaco") {
        if (localStorage.getItem("incode-editor.projects." + name) != null) {

        } else {

        }
    }

    /**
     * @return The current Project or "" if no project is open
     */
    public static getCurrentProjectName(): object {
        return this.currentProject;
    }

}
