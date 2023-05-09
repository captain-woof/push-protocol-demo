import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import * as ethers from "ethers";
import axios from "axios";

const PK = process.env.PRIVATE_KEY; // channel private key
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

export const sendNotification = async (params: any) => {
    const apiResponse = await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
            title: params.title,
            body: params.description
        },
        payload: {
            title: params.title,
            body: params.description,
            cta: 'https://polygon.technology/devxglobaltour',
            img: params.imageUrl
        },
        channel: 'eip155:80001:0xb31cFE5180ea6AF048479FAFa041Adc656F45Fc2',
        env: ENV.STAGING
    });
    return apiResponse;
}
