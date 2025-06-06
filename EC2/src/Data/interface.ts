import docker from "./Objects"
import Docker from 'dockerode';

interface NetworkOptions {
    Name: string;
    Driver?: string;
    CheckDuplicate?: boolean;
    Internal?: boolean;
    Attachable?: boolean;
    IPAM?: Docker.IPAM;
    EnableIPv6?: boolean;
    Options?: { [key: string]: string };
    Labels?: { [key: string]: string };
}
export default NetworkOptions