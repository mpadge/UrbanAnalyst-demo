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
        "main site",
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
                        the&nbsp;
                        <Link href="https://urbananalyst.city" rel="noopener noreferrer">
                            Urban Analyst platform
                        </Link>
                        &nbsp;for interactive visualisation and comparison of
                        cities.  The main site shows aggregated results for a
                        number of cities. This full-resolution demonstration
                        site shows data for only one demonstration city, which
                        be seen on the&nbsp;
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
                        What&apos;s different here?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        In contrast to&nbsp;
                        <Link href="/map" rel="noopener noreferrer">
                            the main site
                        </Link>
                        , this is a demonstration of one city only, with the
                        single&nbsp;
                        <Link href="/map" rel="noopener noreferrer">
                            Map page
                        </Link>
                        &nbsp;having an additional selection for <i>Data Source</i> as:<br />
                    </p>
                </div>
                <div className={styles.centerLeft}>
                    <ol>
                        <li>
                            <i>Aggregate</i>, plotted as polygons, showing the
                            same aggregated data as&nbsp;
                            <Link href="/map" rel="noopener noreferrer">
                                the main site
                            </Link>
                            .
                        </li><br />
                        <li>
                            <i>Transport</i>, plotted as points, showing one
                            data point for every transport stop in the city; or
                        </li><br />
                        <li>
                            <i>Detailed</i>, plotted as lines, showing all
                            underlying data in full resolution, with values for
                            each variable plotted along every street segment
                            throughout the city.
                        </li><br />
                    </ol>
                </div>
                <div className={styles.centerNormal}>
                    <p className="text-center">
                        The <i>Transport</i> and <i>Detailed</i> views show the
                        same individual and pairwise data layers as on the main
                        site. Extending to other data is straightforward, and
                        these pages can be adapted to any needs. Examples include:
                    </p>
                </div>
                <div className={styles.centerLeft}>
                    <ol>
                        <li>
                            A <i>Transport</i> layer showing proportions of
                            trips taken with different modes; or
                        </li><br />
                        <li>
                            A <i>Detailed</i> layer showing numbers of points
                            of interest within some fixed distance, or
                            combinations of variables such as ratios of real
                            estate prices (for U.S. data) to combined transport
                            measures.
                        </li>
                    </ol>
                </div>

            </main>
        </>
    )
}
