import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "../../ui/formatDate";
import { useDarkMode } from "../../context/useDarkMode";

type PostType = {
  likes: string[]; // You might want to refine this type based on the structure of the 'likes' array
  caption: string;
  username: string;
  created_at: string;
};

type PostsTypes =
  | {
      data: PostType[];
      count: number | null;
    }
  | undefined;

export default function AreaChartDashboard({ posts }: { posts: PostsTypes }) {
  const { dark } = useDarkMode();
  const data = posts?.data?.map((post: PostType) => {
    const postLength = post?.likes?.length > 0 ? post?.likes.length : 0;
    return {
      Name: post?.caption,
      User: post?.username,
      created: formatDate(post?.created_at),
      PostLike: postLength,
      amt: 2400,
    };
  });

  return (
    <ResponsiveContainer className="max-w-[750px] sm:min-h-[250px] min-h-[200px] z-0">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={`${dark ? "rgb(79 70 229)" : "#2317fc"}`}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={`${dark ? "rgb(79 70 229)" : "#4c45c1"}`}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis dataKey="created" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="User"
          stroke="rgb(79 70 229)"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="Name"
          stroke="rgb(79 70 229)"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="PostLike"
          stroke="rgb(79 70 229)"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
