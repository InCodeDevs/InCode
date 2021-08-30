/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

export class Networking {

    /**
     * Downloads a file
     * @param filename The name of the file
     * @param text The content of the file
     * @param mimeType The mimeType of the file
     */
    public static download(filename: string, text: string, mimeType = "text/plain") {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    public static downloadCustom(href: string, filename: string){
        const element = document.createElement('a');
        element.setAttribute('href', href);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    public static getURLContent(url: string): string {
        const x = new XMLHttpRequest();
        x.open("GET", url, false)
        x.send(null)
        return x.responseText;
    }
}
