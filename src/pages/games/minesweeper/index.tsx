import Head from 'next/head';
import Minesweeper from "~/components/Games/Minesweeper/Minesweeper";

export default function MinesweeperPage() {
    return (
        <>
            <Head>
                <title>Minesweeper | Felipe Gorostiaga</title>
                <meta name="Minesweeper" content="The Minesweeper Game"/>
            </Head>
            <div
                className="h-full w-full flex items-start justify-center bg-white pt-8 pb-6 sm:pb-14 sm:pt-20 dark:bg-black">
                <Minesweeper/>
            </div>
        </>
    );
}
