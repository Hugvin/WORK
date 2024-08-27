import { NextResponse } from 'next/server';

export async function middleware(request) {
    // Replace this URL with your actual API or bot status check URL
    const botStatusUrl = 'https://status.shiftbot.xyz/shift';
    
    try {
        const response = await fetch(botStatusUrl);
        const data = await response.json();

        if (!data.online) {
            // If bot is offline, redirect to a maintenance page or return an error response
            return NextResponse.redirect('/maintenance');
        }
    } catch (error) {
        // Handle the error (e.g., network issues, API down)
        return NextResponse.redirect('/error');
    }

    // Proceed to the next middleware or destination if the bot is online
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Apply this middleware to all routes
};
