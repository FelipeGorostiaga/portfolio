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
                className="h-full w-full flex items-start justify-center bg-white pt-6 pb-12 dark:bg-black">
                <Minesweeper/>
            </div>
        </>
    );
}
