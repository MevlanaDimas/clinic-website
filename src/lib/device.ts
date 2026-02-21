import { headers } from "next/headers";
import { userAgentFromString } from "next/server";


export async function isMobile() {
    const headersList = await headers();
    const ua = headersList.get("user-agent");

    const { device } = userAgentFromString(ua || "");

    return device.type === 'mobile' || device.type === 'tablet';
}