const handleExport = () => {
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'geometry-configs.json';
  a.click();
};

const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const arr = Array.isArray(data) ? data : [data];
    for (const c of arr) {
      const parsed = savedConfigSchema.safeParse(c);
      if (!parsed.success) throw new Error('Invalid config format');
      await saveConfig({ ...parsed.data, id: crypto.randomUUID() });
    }
    load();
  } catch (err) {
    alert('Import failed: ' + (err as Error).message);
  }
};
