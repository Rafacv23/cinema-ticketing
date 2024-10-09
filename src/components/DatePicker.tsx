import { Input } from "@/components/ui/input"

interface DatePickerProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  today: string
}

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  today,
}: DatePickerProps) {
  return (
    <Input
      type="date"
      id="showtime"
      className="pl-10 grid"
      min={today}
      value={selectedDate}
      style={{
        colorScheme: "dark",
      }}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  )
}
