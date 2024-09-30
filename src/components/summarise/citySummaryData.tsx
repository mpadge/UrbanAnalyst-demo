// This file is generated automatically; do not edit by hand.

import Link from 'next/link';
import styles from '@/styles/summarise.module.css';

const muenster = {
    name: "muenster",
    nameFormatted: "Münster",
    content: (
        <>
            <h1>Statistical summary of Muenster</h1>
            <div className={styles.introPara}> <p>This in an automatically-generated summary of the properties of UA variables for Muenster based on comparison with data for all other UA cities. The summary includes initial descriptions of &quot;single&quot; and &quot;paired&quot; variables, describing only those for which statistical properties are notably different from average properties for all other cities. This is followed by a section summarising the best &quot;target city&quot; for Muenster , selected as the city with the best combined properties for all aspects for which Muenster is worse than average.</p></div>
            <h2>Single variables</h2>
            <p>Values for these single variables can be compared with values for all other UA cities in the
                <Link href='/compare' passHref legacyBehavior rel='noopener noreferrer'>
                    <a className={styles.linkStyle}>
                        &nbsp;compare page
                    </a></Link>
                , or detailed patterns for Muenster viewed in the
                <Link href='/map' passHref legacyBehavior rel='noopener noreferrer'>
                    <a className={styles.linkStyle}>
                        &nbsp;map page
                    </a></Link>
                .</p>
            <h3>Transportation:</h3>
            <ul>
                <li> Muenster has the second worst transport system of all cities.</li>
            </ul>
            <p>This is particularly influenced by:</p>
            <ul>
                <li> Very notably longer intervals between transport services </li>
            </ul>
            <p>Regardless, Muenster also has:</p>
            <ul>
                <li> Moderately fewer numbers of transfers </li>
                <li> Slightly faster absolute transport times </li>
            </ul>
            <h3>Non-transport variables:</h3>

            <p>The following aspects of individual variables are notably good in comparison to the average of all UA cities:</p><ul>
                <li> Slightly better bicycle infrastructure </li>
            </ul>
            <h2>Paired variables</h2>
            <p>As with single variables, values for these paired variables can be compared with values for all other UA cities in the
                <Link href='/compare' passHref legacyBehavior rel='noopener noreferrer'>
                    <a className={styles.linkStyle}>
                        &nbsp;compare page&nbsp;
                    </a></Link>
                by clicking on &quot;paired&quot;, or detailed patterns for Muenster viewed in the
                <Link href='/map' passHref legacyBehavior rel='noopener noreferrer'>
                    <a className={styles.linkStyle}>
                        &nbsp;map page
                    </a></Link>
                , also clicking on &quot;paired&quot;.</p>
            <p>The following aspects of paired variables are notably good in comparison to the average of all UA cities:</p><ul>
                <li> Highly significant strength of relationship between distance to nearest school and social index </li>
                <li> Highly significant strength of relationship between bicycle infrastructure and social index </li>
            </ul>
            <p>While the following aspects are notably bad:</p><ul>
                <li> Very pronounced and disadvantageous strength of relationship between population density and parking index </li>
                <li> Highly significant and counterproductive strength of relationship between transport and social index </li>
                <li> Highly significant and counterproductive strength of relationship between population density and bicycle infrastructure </li>
                <li> Extremely strong and disadvantageous strength of relationship between distance to nearest school and accessibility to natural spaces </li>
                <li> Highly significant and disadvantageous strength of relationship between distance to nearest school and bicycle infrastructure </li>
                <li> Highly significant and disadvantageous strength of relationship between bicycle infrastructure and parking index </li>
                <li> Highly significant and detrimental strength of relationship between transport and distances to nearest schools </li>
                <li> Very pronounced and counterproductive strength of relationship between access to natural spaces and social index </li>
                <li> Extremely strong and counterproductive strength of relationship between transport and bicycle infrastructure </li>
                <li> Highly significant and detrimental strength of relationship between population density and distances to nearest schools </li>
                <li> Pronounced negative strength of relationship between access to natural spaces and parking index </li>
            </ul>
            <h2>Target city for Muenster </h2>
            <p>The best target city is the city which is best in all the ways that Muenster is worse than average. The target city is identified as the city lying at the farthest distance from Muenster in the multi-dimensional space of all variables for which Muenster is worse than average.</p>
            <h2>Best target city is London</h2>
            <p> London is better than Muenster mostly because of improvements in relationships between variables rather than single variables .</p>
            <h2>Paired variables</h2>
            <p>The following aspects of paired variables are notably better in London:</p><ul>
                <li> Highly significantly better strength of relationship between population density and parking index </li>
                <li> Highly significantly better strength of relationship between transport and social index </li>
                <li> Highly significantly better strength of relationship between distance to nearest school and accessibility to natural spaces </li>
                <li> Very notably better strength of relationship between distance to nearest school and bicycle infrastructure </li>
                <li> Considerably better strength of relationship between transport and distances to nearest schools </li>
                <li> Significantly better strength of relationship between access to natural spaces and social index </li>
                <li> Notably better strength of relationship between transport and bicycle infrastructure </li>
                <li> Moderately better strength of relationship between transport and accessibility to natural spaces </li>
                <li> Moderately better strength of relationship between bicycle infrastructure and accessibility to natural spaces </li>
            </ul>
            <p>While the following aspects are notably worse:</p><ul>
                <li> Very notably worse strength of relationship between population density and bicycle infrastructure </li>
                <li> Highly significantly worse strength of relationship between bicycle infrastructure and parking index </li>
                <li> Notably worse strength of relationship between population density and distances to nearest schools </li>
                <li> Significantly worse strength of relationship between access to natural spaces and parking index </li>
                <li> Moderately worse strength of relationship between population density and accessibility to natural spaces </li>
            </ul>
            <h2>Single variables</h2>
            <h3>Transportation:</h3><ul>
                <li>The transport system in London is on average 30% better than in Muenster</li>
            </ul>
            <ul><li>This is particularly influenced by intervals between transport services which are 62% shorter</li></ul>
            <h3>Non-Transportation Variables:</h3>
            <ul>
                <li>Distances to nearest schools are 40% better than in Muenster.</li>
            </ul>
        </>
    )
};

const contentArray = [muenster];

export default function Content() {
    return contentArray;
}
