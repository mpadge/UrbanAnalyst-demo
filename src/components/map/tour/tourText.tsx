
export function controlBoxText (wide = true) {
    const line1 = wide ?
        `This is the "control center" to choose data sources and layers.` :
        `On the left side is the "control center" to choose data sources and layers.`;

    return (
        <div>
            <h2>Controls</h2>
            <br />
            {line1}
            &nbsp;<q><i>Data Source</i></q> allows the selection of aggregate
            (polygons), transport (points), or detailed (lines) data. The
            <q><i>Layer Controls</i></q> select what is shown on the map.
            Details on each layer selection can be seen by clicking on the
            <q><i>Explain layer</i></q> button.
            <br />
            <br />
            For single layers, lower values (yellow colours) are always better
            than high values (blue colours); interpreations of lower vs. higher
            values for paired layers are always given in the <q>Explain
            layer</q> text.
        </div>
    )
}

export function legendText(wide = true) {
    const txt = wide ?
        `Each layer has a legend here, for which yellow colors are generally better, and blue colors worse.` :
        `Each layer has a legend in the lower-left corner, for which more yellow colors are generally better.`;

    return (
        <div>
            <h2>Legend</h2>
            <br />
            {txt}
        </div>
    )
}

export function navText(goTo: (stepIndex: number) => void, wide = true) {
    const line1 = wide ?
        `Finally, these menu items navigate to other pages of this full-resolution demonstration site, as well as the main Urban Analyst site.` :
        `Finally, the menu items navigate to other pages of this full-resolution demonstration site, as well as the main Urban Analyst site.`;

    return (
        <div>
            <h2>Navigation</h2>
            <br />
            {line1}
            <br />
            <br />
            <button color="primary"
                onClick={() => goTo(0)}
                style={{
                    display: "block",
                    margin: "1em auto",
                    border: '1px solid #f7f7f7',
                    background: '#bdbcbb',
                    padding: '.3em .7em',
                    fontSize: 'inherit',
                    cursor: 'pointer',
                }}
            >
                Go back to step 1
            </button>
        </div>
    )
}
