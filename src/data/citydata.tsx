
export const DEFAULT_MAP_CONFIG = {
    "initialViewState": {
        "latitude": 52.505,
        "longitude": 13.409,
        "zoom": 10
    }
}

const muenster = {
    "name": "muenster",
    "nameFormatted": "Münster",
    "path": "/data/muenster/data.json",
    "social_index": "Rates of unemployment, from https://opendata.stadt-muenster.de/",
    "initialViewState": {
        "latitude": 51.964,
        "longitude": 7.633,
        "zoom": 10
    },
    "dataRanges": {
        "social_index": [0.2699, 0.2699, 6.3999, 8.2],
        "times_rel": [0.8153, 0.8153, 1.4069, 1.421],
        "times_abs": [36.8801, 36.8801, 43.7483, 43.7953],
        "transfers": [-0.2266, -0.2266, 0.8125, 1.2169],
        "intervals": [0.9477, 0.9566, 1.526, 1.5511],
        "transport": [36.5331, 36.5331, 63.6734, 65.7945],
        "popdens": [0.8617, 0.8657, 3.8535, 4.4379],
        "school_dist": [1.8358, 2.0608, 3.3298, 3.3298],
        "bike_index": [0.6977, 0.6977, 0.8316, 0.8826],
        "natural": [0.6167, 0.7089, 0.94, 0.94],
        "parking": [0.0016, 0.0021, 0.008, 0.008]
    },
    "dataRangesPaired": {
        "timesrel_timesabs": [31.3259, 31.3259, 58.4817, 58.4817],
        "timesrel_transfers": [-0.32, -0.32, 1.0072, 1.4013],
        "timesrel_intervals": [0.785, 0.785, 1.9966, 2.0894],
        "timesrel_transport": [29.9451, 29.9451, 82.5786, 82.5786],
        "timesrel_popdens": [1.1831, 1.2546, 3.7716, 4.3237],
        "timesrel_schooldist": [1.6254, 1.6254, 4.4388, 4.587],
        "timesrel_bike": [0.5519, 0.5519, 1.157, 1.2489],
        "timesrel_natural": [0.6261, 0.6261, 1.2053, 1.2586],
        "timesrel_parking": [1.5691, 1.5691, 2.1146, 2.1555],
        "timesrel_social": [0.0431, 0.0431, 7.5063, 9.0674],
        "timesabs_transfers": [-9.3938, -9.3938, 33.0515, 51.0603],
        "timesabs_intervals": [36.5331, 36.5331, 63.6734, 65.7945],
        "timesabs_transport": [1357.9278, 1357.9278, 2697.0888, 2794.9658],
        "timesabs_popdens": [34.8118, 38.4722, 150.0677, 170.8755],
        "timesabs_schooldist": [70.4312, 78.2996, 139.6038, 139.6038],
        "timesabs_bike": [26.7805, 26.7805, 34.8932, 34.8932],
        "timesabs_natural": [26.1186, 28.1098, 38.2946, 38.2946],
        "timesabs_parking": [46.8978, 54.129, 81.1877, 81.1877],
        "timesabs_social": [3.1634, 3.1634, 268.3655, 343.1663],
        "transfers_intervals": [-0.3793, -0.3793, 1.1504, 1.9126],
        "transfers_transport": [-15.8588, -15.8588, 47.0451, 80.2486],
        "transfers_popdens": [-0.4153, -0.4153, 1.6886, 2.6113],
        "transfers_schooldist": [-0.7094, -0.7094, 2.3291, 3.5279],
        "transfers_bike": [-0.1863, -0.1863, 0.6423, 0.9484],
        "transfers_natural": [-0.2106, -0.2106, 0.7036, 1.0305],
        "transfers_parking": [-0.2947, -0.2947, 1.2162, 1.9239],
        "transfers_social": [-1.1787, -1.1787, 3.238, 4.282],
        "intervals_transport": [31.9271, 31.9271, 95.4557, 102.7244],
        "intervals_popdens": [1.0931, 1.2099, 4.5673, 4.9357],
        "intervals_schooldist": [1.8793, 2.0673, 4.6692, 4.6692],
        "intervals_bike": [0.6812, 0.6812, 1.2223, 1.2425],
        "intervals_natural": [0.7314, 0.7314, 1.3173, 1.3173],
        "intervals_parking": [1.532, 1.5881, 2.5492, 2.5492],
        "intervals_social": [-0.2928, -0.2928, 8.7866, 11.7869],
        "transport_popdens": [44.0585, 51.669, 179.5514, 189.9454],
        "transport_schooldist": [72.0487, 78.1518, 194.4761, 197.1827],
        "transport_bike": [26.1367, 26.1367, 50.7172, 51.4473],
        "transport_natural": [28.2878, 28.2878, 54.3254, 55.416],
        "transport_parking": [59.2084, 61.3981, 105.5606, 105.5606],
        "transport_social": [-21.9451, -21.9451, 368.1625, 493.4777],
        "popdens_schooldist": [2.6009, 2.6899, 9.5123, 10.9717],
        "popdens_bike": [0.7073, 0.7339, 2.8285, 3.2742],
        "popdens_natural": [0.7028, 0.7028, 3.2543, 3.8383],
        "popdens_parking": [1.0912, 1.0912, 7.0131, 7.8636],
        "popdens_social": [0.7659, 0.7659, 14.2423, 16.9917],
        "schooldist_bike": [1.3561, 1.4367, 2.704, 2.7834],
        "schooldist_natural": [1.4705, 1.5995, 2.8412, 2.8439],
        "schooldist_parking": [3.306, 3.5556, 5.4223, 5.4223],
        "schooldist_social": [0.0715, 0.0715, 18.2017, 22.4928],
        "bike_natural": [0.4979, 0.5198, 0.7409, 0.7894],
        "bike_parking": [0.9472, 1.0865, 1.4708, 1.4708],
        "bike_social": [0.1452, 0.1452, 4.9872, 6.3765],
        "natural_parking": [0.819, 1.0627, 1.7058, 1.7058],
        "natural_social": [0.0846, 0.0846, 5.458, 7.175],
        "parking_social": [0.2841, 0.2841, 10.8492, 14.2054]
    },
    "stats_single": {
        "social_index": [3.23, 1.53],
        "times_rel": [1.07, 0.13],
        "times_abs": [39.96, 1.85],
        "transfers": [0.27, 0.31],
        "intervals": [18.34, 7.94],
        "transport": [49.22, 7.69],
        "popdens": [1.61, 1.34],
        "school_dist": [393.23, 142.41],
        "bike_index": [0.76, 0.03],
        "natural": [0.84, 0.08],
        "parking": [5.23, 7.52]
    },
    "stats_paired": {
        "intervals_transport": 0.3,
        "schooldist_popdens": -0.088,
        "timesrel_bike": 0.085,
        "schooldist_bike": 0.082,
        "timesrel_parking": -0.081,
        "bike_parking": -0.08,
        "natural_popdens": 0.078,
        "intervals_parking": -0.073,
        "timesabs_transport": 0.07,
        "timesrel_popdens": -0.069,
        "intervals_bike": 0.067,
        "transport_social": 0.058,
        "timesabs_popdens": -0.058,
        "transport_parking": -0.055,
        "parking_popdens": 0.054,
        "schooldist_parking": -0.053,
        "transfers_parking": -0.051,
        "social_popdens": -0.05,
        "transport_bike": 0.05,
        "bike_popdens": -0.05,
        "timesabs_social": 0.047,
        "timesrel_transport": 0.046,
        "transfers_intervals": 0.046,
        "timesrel_intervals": 0.045,
        "intervals_social": 0.039,
        "timesabs_natural": -0.039,
        "timesrel_schooldist": 0.038,
        "transport_popdens": -0.036,
        "transfers_bike": 0.035,
        "timesrel_timesabs": 0.035,
        "natural_parking": -0.032,
        "social_natural": 0.032,
        "timesabs_schooldist": 0.032,
        "transport_schooldist": 0.032,
        "timesrel_transfers": 0.032,
        "transfers_transport": 0.03,
        "transfers_natural": 0.029,
        "intervals_popdens": -0.026,
        "intervals_schooldist": 0.025,
        "social_bike": 0.024,
        "bike_natural": 0.019,
        "timesrel_social": 0.018,
        "social_schooldist": 0.015,
        "timesabs_parking": 0.012,
        "intervals_natural": 0.0099,
        "timesabs_transfers": -0.0079,
        "social_parking": -0.0073,
        "timesabs_intervals": 0.0069,
        "schooldist_natural": 0.0058,
        "transfers_social": 0.0055,
        "timesabs_bike": -0.0047,
        "transfers_schooldist": 0.0046,
        "transfers_popdens": -0.0022,
        "timesrel_natural": 0.0018,
        "transport_natural": 0
    }
}

export const CITY_DATA = {
    "citiesArray": [muenster],
};
