import * as fs from "fs"
import * as path from "path"

import {expect} from "chai"

const build_dir = path.normalize(`${__dirname}/../..`) // build/test/codebase -> build

const LIMITS: {[key: string]: number} = {
  "js/bokeh.min.js":          670,
  "js/bokeh-widgets.min.js":  250,
  "js/bokeh-tables.min.js":   270,
  "js/bokeh-api.min.js":      90,
  "js/bokeh-gl.min.js":       70,
}

describe(`bokehjs/build/*/*.min.js file sizes`, () => {
  for (const filename in LIMITS) {
    const stats = fs.statSync(path.join(build_dir, filename))
    const limit = LIMITS[filename]

    describe(`${filename} file size`, () => {
      it(`should be ${Math.round(stats.size/1024)} kB <= ${limit} kB`, () => {
        expect(stats.size).to.be.at.most(limit*1024)
      })
    })
  }
})
