
path <- "/<path>/<to>/uawf-results/<city>"
flist <- fs::dir_ls (path)
dat <- do.call (rbind, lapply (flist, readRDS))
rownames (dat) <- NULL

# Rm columns
index <- grep ("\\_d05", names (dat))
dat <- dat [, -(index)]

# Convert to sf:
index <- match (c ("x", "y"), names (dat))
xy <- as.matrix (dat [, index])
dat <- dat [, -index]
g <- sf::st_sfc (apply (xy, 1, sf::st_point, simplify = FALSE), crs = 4326)
dat <- sf::st_sf (dat, geometry = g)

# Rename vars, and add extra transport column, as in uaengine calcs for
# compound transport variable:
names (dat) <- gsub ("\\_d[0-9]+$", "", names (dat))
dat <- dplyr::mutate (
    dat,
    transport = times_abs * log10 (intervals),
    .after = "intervals"
)

this_dir <- fs::dir_ls (".", type = "directory")
f_out <- fs::path (this_dir, "data-full.json")
geojsonio::geojson_write (dat, file = f_out)
