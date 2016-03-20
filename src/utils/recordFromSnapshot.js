export default function recordFromSnapshot(snapshot) {
  const record = snapshot.val();
  record.id = snapshot.key();
  return record;
}
