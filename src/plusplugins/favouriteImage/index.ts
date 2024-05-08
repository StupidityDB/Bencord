/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";
declare global {
    interface RegExpConstructor {
        _test?: (str: string) => boolean;
    }
}

export default definePlugin({
    name: "FavouriteImage",
    description: "Allows you to favourite an image.",
    authors: [Devs.VeygaX, Devs.Davri],
    start() {
        RegExp._test ??= RegExp.prototype.test;
        RegExp.prototype.test = function (str) { return (RegExp._test ?? (() => false)).call(this.source === "\\.gif($|\\?|#)" ? /\.(gif|png|jpe?g|webp)($|\?|#)/i : this, str); };
    },
    stop() {
        RegExp.prototype.test = RegExp._test ?? (() => false);
        delete RegExp._test;
    },
});
