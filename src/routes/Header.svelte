<script lang="ts">
  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
</script>

<header>
  <span class="date">{date.getDate()}</span>
  <span class="month">{months[date.getMonth()]}</span>
  <span class="year">{date.getFullYear()}</span>
  <span class="day">{days[date.getDay()]}</span>
</header>

<style>
  header {
    display: grid;
    gap: 0 var(--size-2);
    font-size: var(--font-size-4);
    grid-template-columns: auto auto 1fr;
    grid-template-areas:
      "date month ."
      "date year day";
    justify-content: start;
    align-items: end;
    line-height: 1;

    .date {
      grid-area: date;
      font-size: var(--font-size-8);
      font-weight: 700;
    }
    .month {
      grid-area: month;
      font-weight: 700;
    }
    .year {
      grid-area: year;
    }
    .day {
      grid-area: day;
      justify-self: end;
    }
  }
</style>
