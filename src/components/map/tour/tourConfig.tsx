"use client"

import useWindowSize from '@/components/windowSize';
import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { controlBoxText, legendText, navText } from "@/components/map/tour/tourText";

const tourPanelBackgroundColour = '#9cf7f7';
const tourPanelBorderRadiusWide = '20px';
const tourPanelBorderRadiusNarrow = '10px';

export const getTourConfig = (width: number, height: number) => [
    {    
        selector: '[data-tut="reactour__maps_welcome"]',
        content: () => (
            <div>
                <h2>Urban Analyst</h2>
                <br />
                This guided tour can be closed by clicking anywhere outside
                these boxes, and re-started any time by clicking on the
                <q>Help</q> button on the left.
                <br />
                <br />
                If you&apos;ve got a keyboard, you can step through with arrow
                keys, and close with <q>Escape</q>. Press an arrow now to
                start...
            </div>
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            maxWidth: maxWidth(width, true),
        }
    },
    {
        selector: '[data-tut="reactour__maps_page"]',
        content: (
            <div>
                <h2>Maps</h2>
                <br />
                This page shows interactive maps for one demonstration city.
                Different to the main site, which shows only aggregated data,
                this page has three different <i>Data Source</i> options.
            </div>
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        selector: '[data-tut="reactour__maps_page"]',
        content: (
            <div>
                <h2>Maps</h2>
                <br />
                <ul>
                    <li>
                        <i>Aggregate</i> data are the same as on the main site,
                        plotted as polygons;
                    </li>
                    <li>
                        <i>Transport</i> data show point values at every
                        transport stop; and
                    </li>
                    <li>
                        <i>Detailed</i> data values measured along every single
                        street segment, and plotted as lines.
                    </li>
                </ul>
                <br />
                Note that relationships between variables can only be measured
                at the aggregate scale, and so the latter two offer views of
                single variables only
            </div>
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        selector: '[data-tut="reactour__maps_controls"]',
        content: () => controlBoxText(width > 700),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            maxWidth: maxWidth(width, true),
        }
    },
    {
        selector: '[data-tut="reactour__maps_controls_rangelimits"]',
        content: (
            <div>
                <h2>Controls</h2>
                <br />
                The control panel also includes a <q><i>Colour
                Limits</i></q>&nbsp;slider which can be used to restrict the
                range of data fitted in to the colour scale. This can be used
                to focus the full colour range in to particular ranges or areas
                of interest.
            </div>
        ),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            maxWidth: maxWidth(width, true),
        }
    },
    {    
        selector: '[data-tut="reactour__maps_legend"]',
        content: () => legendText(width > 700),
        style: {
            width: maxWidth(width),
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
        }
    },
    {
        selector: '[data-tut="reactour__maps_nav_buttons"]',
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            top: posControlsY(width, height, "nav"),
            width: maxWidth(width),
        },
        content: ({ goTo }: { goTo: (stepIndex: number) => void }) => (
            navText(goTo, width > 700)
        )
    },

];

export default getTourConfig;
