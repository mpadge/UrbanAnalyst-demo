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
        "main site"
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
                        site shows data for only one demonstration city,
                        on the&nbsp;
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
                                    Demonstration of full-resolution data as
                                    interactive maps.
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
                        This demonstration site shows data for one city only,
                        with the single&nbsp;
                        <Link href="/map"
                            rel="noopener noreferrer">
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

                <div className={styles.centerBig}>
                    <p className="text-center">
                        What else can Urban Analyst do?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        This part of the site is intended to demonstrate just
                        some of the capabilities of the full-resolution data
                        underlying <i>Urban Analyst</i>. These pages can be
                        adapted to any needs, and extending to other data is
                        straightforward. Any city can have their own&nbsp;
                        <i>&lt;mycity&gt;.urbananalyst.city</i>&nbsp;pages
                        (either public or private), with any kinds of custom
                        data or analyses. The following sections describe some
                        of the ways custom, city-specific sites can be
                        adapted.
                    </p>

                    <h2>Additional Data Layers</h2>
                    <p className="text-center">
                        Full-resolution sites can easily incorporate additional
                        data layers beyond those displayed on the main site.
                        Examples include:
                    </p>
                </div>

                <div className={styles.centerLeft}>
                    <ol>
                        <li>
                            <i>Transport</i> layers showing proportions of
                            trips taken with different modes;
                        </li><br />
                        <li>
                            <i>Detailed</i> layers showing average numbers of
                            points of interest within some fixed distance;
                        </li><br />
                        <li>
                            Any desired combinations of variables, such as
                            ratios of real estate prices (for U.S. data) to
                            combined transport measures.
                        </li><br />
                        <li>
                            Typical per-capita exposure to vehicular emissions
                            for all pedestrian or bicycle journeys.
                        </li><br />
                        <li>
                            Additional data can easily be integrated. For
                            example, data on street shading would enable
                            calculation of proportions of pedestrian journeys
                            under shade. Dynamic scenarios can also be
                            considered, in which route calculations vary
                            throughout the day.
                        </li>
                    </ol>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Beyond additional data layers, custom&nbsp;
                        <i>&lt;mycity&gt;.urbananalyst.city</i>&nbsp;pages can
                        also be extended to:
                    </p>
                    <h2>Track Urban Development</h2>
                    <p className="text-center">
                        Urban Analyst is the ideal platform for recording and
                        analysing the ongoing development of cities. Both the
                        standard metrics, and any additional custom metrics,
                        can be recorded at regular time intervals, providing
                        snapshots of a city as it develops and progresses.
                    </p>
                    <p className="text-center">
                        A few months of data are sufficient to generate time
                        series of all variables measured. This is enough to
                        populate an additional page of interactive time-series
                        data. These time-series pages function just like the
                        <i>Map</i> page for spatial data, yet filled with
                        data-rich time-series, including the development of
                        pair-wise relationships between all variables.
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <h2>Compare and Evaluate Scenarios</h2>
                    <p className="text-center">
                        Urban planning scenarios can easily be entered into
                        Urban Analyst data, and the different scenarios
                        compared in terms of their effects on all measured
                        variables. Urban Analyst can also compare scenarios in
                        terms of their effects of relationships between
                        variables. In combination with the time-series analyses
                        described above, scenarios can also be examined in
                        their effects both in time and in space. Finally, the
                        huge amount of data from other cities around the world
                        enables developmental scenarios to be directly compared
                        with equivalent, actual rates and directions of
                        development of any and all other cities.
                    </p>
                </div>

                <div className={styles.centerBig}>
                    <p className="text-center">
                        Interested?
                    </p>
                </div>

                <div className={styles.centerNormal}>
                    <p className="text-center">
                        Write us an email at&nbsp;
                        <Link href="mailto:info@urbananalyst.city" rel="noopener noreferrer">
                            info@urbananalyst.city
                        </Link>
                        .
                    </p>
                </div>
            </main>
        </>
    )
}
