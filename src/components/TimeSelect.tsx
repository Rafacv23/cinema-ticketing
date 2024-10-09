import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TimeSelectorProps {
  selectedTime: string
  setSelectedTime: (time: string) => void
}

export default function TimeSelector({
  selectedTime,
  setSelectedTime,
}: TimeSelectorProps) {
  return (
    <Select onValueChange={setSelectedTime} defaultValue={selectedTime}>
      <SelectTrigger className="mt-2 mb-4 p-2 border rounded">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Time</SelectLabel>
          {Array.from({ length: 12 }).map((_, i) => {
            const time = `${String(i + 12).padStart(2, "0")}:00`
            return (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
