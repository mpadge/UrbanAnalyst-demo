/**
 * Main page
 *
 */
import Image from "next/image"
import Link from 'next/link'
import type { Metadata, Viewport } from 'next';
import mapImage from '@/images/map.png';

import styles from '@/styles/Home.module.css'
import ButtonAppBar from '@/components/appBar';
import { ButtonAppProps } from '@/data/interfaces';

/**
 * NextJS metadata for main page
 */
export const metadata: Metadata = {
    title: 'UA',
    description: 'Urban Analyses for the world',
    icons: '/ua.ico',
}

/**
 * Default viewport for DeckGL
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
}

/**
 * Main page for entire site.
 */
export default function Home() {

    const buttonTxt = [
        "map",
        "about"
    ]

    return (
        <>
            <ButtonAppBar text={buttonTxt} />
            <main className={styles.main}>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        Urban Analyst at Full Resolution
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        A demonstration of full-resolution data underlying
                        the &nbsp;
                        <Link href="https://urbananalyst.city" rel="noopener noreferrer">
                            Urban Analyst platform
                        </Link>
                        &nbsp; for interactive visualisation and comparison of
                        cities.  The demonstration can be seen on the &nbsp;
                        <Link href="/map" rel="noopener noreferrer">
                            Map page.
                        </Link>
                    </p>
                </div>

                <div className={styles.grid}>

                    <div className={styles.card}>
                        <Link href="/map" rel="noopener noreferrer">
                            <div className={styles.cardContent}>
                                <h2>
                                    Map <span>&#8628;</span>
                                </h2>
                                <p className={styles.cardText}>
                                    View interactive map with demonstration of full-resolution data.
                                </p>
                            </div>
                            <div className={styles.cardImage}>
                                <Image
                                    src={mapImage}
                                    alt="Image of UrbanAnalyst Map page"
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        </Link>
                    </div>

                </div>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        How does it work?
                    </p>
                </div>

                <div className={styles.centerNormal}>

                    <p className="text-center">
                        Results for each city involve billions of routing
                        calculations through street networks and public transport
                        systems.  These are calculated using Urban Analyst&apos;s
                        own open-source software described in
                        <a className = {styles.textLink}
                            href="https://docs.urbananalyst.city" >&nbsp;the
                            documentation pages </a>. These enormous numbers of
                        calculations enable Urban Analyst to provide uniquely
                        powerful insights into how people move throughout cities.
                    </p>
                </div>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        How can cities be added?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Please open an issue on
                        <a className = {styles.textLink}
                            href="https://github.com/mpadge/UrbanAnalyst/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            &nbsp;the GitHub repository of this site
                        </a>
                        &nbsp;requesting the addition of a particular city.
                    </p>
                </div>

            </main>
        </>
    )
}
