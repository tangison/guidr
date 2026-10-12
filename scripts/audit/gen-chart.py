"""Findings-by-severity horizontal bar chart for the audit report (charts.md rules:
values labeled directly so gridlines deleted, top/right spines deleted, no legend)."""
import matplotlib
matplotlib.use("Agg")
import matplotlib.font_manager as fm
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# Template 07 Crystal Blue palette
ACCENT = '#2d7ab3'
HEADER = '#1a4a7a'
MUTED = '#5a7a96'
TEXT = '#142840'
CARD = '#e4ecf5'

cats = ['Medium', 'High', 'Critical']
vals = [6, 5, 4]
colors_list = [CARD, ACCENT, HEADER]

fig, ax = plt.subplots(figsize=(7.2, 2.4), constrained_layout=True)
bars = ax.barh(cats, vals, color=colors_list, height=0.62, zorder=3)
# rounded feel via edge none; flat base anchors left
for edge in ('top', 'right', 'left'):
    ax.spines[edge].set_visible(False)
ax.spines['bottom'].set_color('#c0d0e2')
ax.spines['bottom'].set_linewidth(0.6)
# values labeled directly -> no grid at all
ax.grid(False)
ax.set_xlim(0, 7)
ax.tick_params(axis='y', length=0, labelsize=10, colors=TEXT)
ax.tick_params(axis='x', length=3, labelsize=8, colors=MUTED)
ax.set_xlabel('Findings', fontsize=9, color=MUTED)
for b, v in zip(bars, vals):
    ax.text(v + 0.12, b.get_y() + b.get_height() / 2, str(v),
            va='center', ha='left', fontsize=10, color=TEXT, fontweight='bold')
fig.savefig('/home/z/my-project/scripts/audit/findings-chart.png', dpi=200,
            facecolor='white')
print('chart saved')
