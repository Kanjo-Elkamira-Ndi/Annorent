import sys, glob, os, io
from fontTools.ttLib import TTFont
from fontTools import subset
for f in sorted(glob.glob(sys.argv[1] + "/*.ttf")):
    t = TTFont(f)
    feats = sorted({fr.FeatureTag for fr in t["GSUB"].table.FeatureList.FeatureRecord}) if "GSUB" in t else []
    cmap = t.getBestCmap()
    fr_chars = "éèêëàâçîïôûùüÿœæÉÈÊÀÇŒ«»"
    missing = [c for c in fr_chars if ord(c) not in cmap]
    axes = [(a.axisTag, a.minValue, a.maxValue) for a in t["fvar"].axes] if "fvar" in t else []
    # latin+latin-ext woff2 size estimate
    opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = ["*"]
    s = subset.Subsetter(opts); s.populate(unicodes=list(range(0x20,0x7F))+list(range(0xA0,0x180))+[0x20AC,0x2019,0x201C,0x201D,0x2026,0x2013,0x2014,0x2009,0x202F])
    t2 = TTFont(f); s.subset(t2); buf = io.BytesIO(); t2.flavor="woff2"; t2.save(buf)
    print(f"{os.path.basename(f)[:40]:40} tnum={'tnum' in feats} lnum={'lnum' in feats} ss={[x for x in feats if x.startswith('ss')][:4]} FRmissing={''.join(missing) or '-'} axes={axes} woff2_latin={len(buf.getvalue())//1024}KB")
