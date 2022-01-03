/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { JSONObject } from "../../types/JSONObject";
import MenuBar from "./MenuBar";
import Header from "./Header";
import Feature from "./Feature";
import Features from "./Features";
import Button from "./Button";

const LP: JSONObject = {};

LP.MenuBar = MenuBar;
LP.Header = Header;
LP.Feature = Feature;
LP.Features = Features;
LP.Button = Button;

export default LP;
