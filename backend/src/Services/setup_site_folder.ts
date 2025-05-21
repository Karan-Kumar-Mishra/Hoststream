import { locations } from "../Data/data";
import generate_name from "./generate_name.js";
export default function setup_site_folder() {
    locations.user_site_loactions=generate_name();
}