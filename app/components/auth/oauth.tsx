'use dom';
import '~/global.css';
import { Link } from 'expo-router';

// import Image from "~/assets/images/chill.png"
import { Image } from 'react-native';

import { Button } from '../ui/button';

export default function Oauth() {
    return (
        <div className="flex min-h-screen w-[100vw] items-center justify-center p-12">
            <div className="flex flex-col items-center gap-6">
                <h1 className="text-2xl font-semibold">pls use email-password</h1>
                <Image source={require('assets/images/chill.png')} className="w-[100px]" alt="chill-guy" />
                <Link href="/auth">
                    <Button className="mt-4">Go to Authentication</Button>
                </Link>
            </div>
        </div>
    );
}
