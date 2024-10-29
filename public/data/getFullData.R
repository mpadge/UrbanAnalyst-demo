
path <- "/<path>/<to>/uawf-results/<city>"
flist <- fs::dir_ls (path)
dat <- do.call (rbind, lapply (flist, readRDS))
rownames (dat) <- NULL

# Rm columns
index <- grep ("\\_d05", names (dat))
dat <- dat [, -(index)]

# Convert xy to "position" list:
index <- match (c ("x", "y"), names (dat))
xy <- as.matrix (dat [, index])
dat <- dat [, -index]
xy <- apply (xy, 1, function (i) {
    list (unname (i))
})
dat$position <- I(lapply (xy, unlist))

# g <- sf::st_sfc (apply (xy, 1, sf::st_point, simplify = FALSE), crs = 4326)
# dat <- sf::st_sf (dat, geometry = g)

# Rename vars, and add extra transport column, as in uaengine calcs for
# compound transport variable:
names (dat) <- gsub ("\\_d[0-9]+$", "", names (dat))
dat <- dplyr::mutate (
    dat,
    transport = times_abs * log10 (intervals),
    .after = "intervals"
) |>
    dplyr::filter (!is.na (transport))

this_dir <- fs::dir_ls (".", type = "directory")
f_out <- fs::path (this_dir, "data-full.json")
# geojsonio::geojson_write (dat, file = f_out)
# jsonlite::write_json (dat, f_out)

f_out <- fs::path (this_dir, "full-geo_xy.json")
jsonlite::write_json (dat$position, f_out)
dat <- dplyr::select (dat, -c (osm_id, position))
for (n in names (dat)) {
    f_out <- fs::path (this_dir, paste0 ("full-dat-", n, ".Rds"))
    jsonlite::write_json (dat [[n]], f_out)
}
