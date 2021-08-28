/**
 * @author The InCode Devs
 * @copyright 2018-2021 The InCode Developers <https://github.com/InCodeDevs>
 */

import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import { ObjectDefinition } from '../../Registry';

import {Props, Entry, State} from '../../types/SearchScreen';
import {Area} from './SearchScreen/Area';
import {UIManager} from "../../utils/UIManager";
import { MainMenu } from '../MainMenu';

export class SearchScreen extends React.Component<Props, State> {

    render() {
        return (
            <>
            <div style={{textAlign: 'center'}}>
                    <div style={{display: 'flex', width: "100%", marginTop: "2%", marginBottom: "2%"}}>
                        <h1 style={{color: "#F8F9FAFF", flex: "55%", textAlign: "right"}}>{this.props.title}</h1>
                        <div style={{flex: "45%", display: "flex", justifyContent: "right"}}>
                            {
                                this.props.buttons.custom.map(b => {
                                    return (
                                        <Button variant={"outline-flat"} size={"xxl"}
                                                style={{
                                                    marginRight: "1.5rem"
                                                }}
                                                onClick={b.callback}>{b.title}</Button>
                                    )
                                })
                            }
                            {
                                this.props.buttons.mainMenu && <Button  variant={"outline-flat"} size={"xxl"}
                                                                        style={{
                                                                            marginRight: "1.5rem"
                                                                        }}
                                                                        onClick={() => {
                                                                            UIManager.showComponent(<MainMenu />)
                                                                        }}>Hauptmenü</Button>
                            }
                        </div>
                    </div>
                    <div style={{textAlign: 'center', display: "flex", justifyContent: "center"}}>
                        <Form.Control type={"text"} placeholder={"Suchen..."} style={{
                            width: "30%",
                            fontSize: "1.5rem"
                        }} id={"search-bar"} onChange={() => {
                            let term = (document.getElementById('search-bar') as HTMLInputElement).value.trim();
                            if (term.length > 0) {
                                let ent: Entry[] = [];
                                this.props.entries.forEach(e => {
                                    if(e.title.toLowerCase().includes(term.toLowerCase())){
                                        ent.push(e)
                                    }
                                })
                                console.log(ent)
                                this.updateEntries(ent);
                            } else {
                                this.updateEntries(this.props.entries);
                            }
                        }} />
                    </div>
                    <div style={{display: "flex", width: "100%", marginTop: "2%"}}>
                        {
                            this.props.areas.map(a => {
                                return (
                                    <Area title={a.title} id={a.id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        this.updateEntries(this.props.entries)
    }

    updateEntries(entries: Entry[]) {
        this.props.areas.forEach(area => {
            (document.getElementById(area.id) as HTMLDivElement).innerHTML = "<h2>" + area.title + "</h2>"
        })

        entries.forEach(e => {
            
            let element = document.createElement('div');
            element.classList.add('template');

            element.addEventListener('click', e.callback)

            let badge = document.createElement('span')
            badge.className = 'verified';
            badge.innerText = "✓"

            if (!e.badge) {
                badge.style.visibility = 'hidden'
            }

            let image = document.createElement('img');
            image.width = 128
            image.height = 128
            image.src = e.imageURL;

            let h5 = document.createElement('h5');
            h5.classList.add('template-name')
            h5.innerText = e.title;

            element.appendChild(badge);
            element.appendChild(image);
            element.appendChild(h5);

            (document.getElementById(e.area.toLowerCase()) as HTMLDivElement).appendChild(element);
        })
    }

}