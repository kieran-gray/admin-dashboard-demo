import type {
  NotificationStatus,
  NotificationDetail,
} from "@/components/notification/NotificationTypes";
import type { ContactMessage } from "@/components/contact_message/ContactMessage";
import type { Event } from "@/components/notification_event_timeline/EventTypes";

interface FullNotificationData extends NotificationStatus {
  channel: string;
  destination: string;
  template: string;
  created_at: string;
  external_id: string | null;
}

const generateMockNotifications = (count: number): FullNotificationData[] => {
  const channels = ["Email", "SMS", "WhatsApp"];
  const statuses = ["DELIVERED", "SENT", "RENDERED", "FAILED", "REQUESTED"];
  const templates = [
    "WelcomeEmail",
    "PasswordReset",
    "OrderConfirmation",
    "ShippingUpdate",
    "Newsletter",
  ];

  const notifications: FullNotificationData[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const createdAt = new Date(
      now - Math.random() * 90 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const updatedAt = new Date(
      new Date(createdAt).getTime() + Math.random() * 24 * 60 * 60 * 1000,
    ).toISOString();

    notifications.push({
      notification_id: `notif-${1000 + i}`,
      user_id: `user-${Math.floor(Math.random() * 100)}`,
      channel: channels[Math.floor(Math.random() * channels.length)],
      destination: `user${Math.floor(Math.random() * 1000)}@example.com`,
      template: templates[Math.floor(Math.random() * templates.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      created_at: createdAt,
      updated_at: updatedAt,
      external_id:
        Math.random() > 0.3 ? `ext-${Math.floor(Math.random() * 10000)}` : null,
    });
  }

  return notifications.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
};

const generateMockContactMessages = (count: number): ContactMessage[] => {
  const categories = ["ERROR", "IDEA", "TESTIMONIAL", "OTHER"];

  const testimonialMessages = [
    "This product has completely transformed how we handle our workflows. The interface is intuitive and the features are exactly what we needed!",
    "Outstanding service! The team was incredibly responsive and helped us get set up in no time. Highly recommend!",
    "I've been using this for 6 months now and couldn't be happier. The reliability and performance have exceeded our expectations.",
    "Best decision we made this year. The ROI has been fantastic and our team loves using it every day.",
    "Excellent platform! Very user-friendly and the customer support is top-notch. Five stars all the way!",
  ];

  const errorMessages = [
    "I'm encountering an error when trying to export data. The download button doesn't seem to be working.",
    "There's a bug in the notification system - I'm not receiving email alerts even though they're enabled.",
    "The dashboard layout breaks on mobile devices. Some buttons are not accessible.",
  ];

  const ideaMessages = [
    "It would be great to have a dark mode option for the dashboard.",
    "Could you add bulk import functionality? Would save us a lot of time.",
    "A mobile app would be amazing! We often need to check things on the go.",
  ];

  const otherMessages = [
    "Just wanted to say thank you for creating such a great product!",
    "Do you have any plans for adding integrations with other tools?",
    "Is there a way to customize the report templates?",
  ];

  const messages: ContactMessage[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const receivedAt = new Date(
      now - Math.random() * 60 * 24 * 60 * 60 * 1000,
    ).toISOString();
    const category = categories[Math.floor(Math.random() * categories.length)];

    let message = "";
    let data = undefined;

    if (category === "TESTIMONIAL") {
      message =
        testimonialMessages[
          Math.floor(Math.random() * testimonialMessages.length)
        ];
      data = {
        rating: String(Math.floor(Math.random() * 2) + 4),
        consent: Math.random() > 0.3 ? "true" : "false",
      };
    } else if (category === "ERROR") {
      message = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    } else if (category === "IDEA") {
      message = ideaMessages[Math.floor(Math.random() * ideaMessages.length)];
    } else {
      message = otherMessages[Math.floor(Math.random() * otherMessages.length)];
    }

    const firstNames = [
      "Alex",
      "Jordan",
      "Casey",
      "Morgan",
      "Taylor",
      "Riley",
      "Sam",
      "Drew",
      "Jamie",
      "Quinn",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];
    const name = `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    } ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

    messages.push({
      id: `msg-${2000 + i}`,
      name,
      email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
      category,
      message,
      received_at: receivedAt,
      data,
    });
  }

  return messages.sort((a, b) => b.received_at.localeCompare(a.received_at));
};

const mockNotifications = generateMockNotifications(
  Math.floor(Math.random() * (97 - 28 + 1)) + 28,
);
const mockContactMessages = generateMockContactMessages(
  Math.floor(Math.random() * (53 - 13 + 1)) + 13,
);

const generateActivityData = (
  days: number,
): Array<{ count: number; date: string }> => {
  const activity: Array<{ count: number; date: string }> = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    activity.push({
      date: date.toISOString(),
      count: Math.floor(Math.random() * 20) + 5,
    });
  }

  return activity;
};

const getMockNotificationDetail = (
  notificationId: string,
): NotificationDetail | null => {
  const notification = mockNotifications.find(
    (n) => n.notification_id === notificationId,
  );
  if (!notification) return null;

  const detail: NotificationDetail = {
    notification_id: notification.notification_id,
    user_id: notification.user_id,
    status: notification.status,
    channel: notification.channel,
    destination: notification.destination,
    template: notification.template,
    external_id: notification.external_id,
    created_at: notification.created_at,
    updated_at: notification.updated_at,
    dispatched_at:
      notification.status !== "REQUESTED" && notification.status !== "RENDERED"
        ? new Date(
            new Date(notification.created_at).getTime() + 60000,
          ).toISOString()
        : null,
    delivered_at:
      notification.status === "DELIVERED"
        ? new Date(
            new Date(notification.created_at).getTime() + 120000,
          ).toISOString()
        : null,
    failed_at:
      notification.status === "FAILED"
        ? new Date(
            new Date(notification.created_at).getTime() + 90000,
          ).toISOString()
        : null,
    rendered_content:
      notification.channel === "Email"
        ? {
            Email: {
              subject: `${notification.template} - Demo Email`,
              html_body: `<h1>Hello!</h1><p>This is a demo email for the ${notification.template} template.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
            },
          }
        : notification.channel === "SMS"
          ? {
              Sms: {
                body: `This is a demo SMS message for ${notification.template}.`,
              },
            }
          : {
              WhatsApp: {
                body: `This is a demo WhatsApp message for ${notification.template}.`,
              },
            },
  };

  return detail;
};

const getMockNotificationEvents = (notificationId: string): Event[] => {
  const notification = mockNotifications.find(
    (n) => n.notification_id === notificationId,
  );
  if (!notification) return [];

  const events: Event[] = [
    {
      event: {
        NotificationRequested: {
          notification_id: notification.notification_id,
          channel: notification.channel.toLowerCase(),
          destination: {
            type: notification.channel === "Email" ? "email" : "phone",
            value: notification.destination,
          },
          template_data: {
            type: notification.template,
            data: {},
          },
          metadata: {},
        },
      },
      metadata: {
        aggregate_id: notification.notification_id,
        sequence: 1,
        event_version: 1,
        timestamp: notification.created_at,
        user_id: notification.user_id,
      },
    },
  ];

  if (notification.status !== "REQUESTED") {
    events.push({
      event: {
        RenderedContentStored: {
          notification_id: notification.notification_id,
          rendered_content:
            notification.channel === "Email"
              ? { Email: { subject: "Demo", html_body: "Demo content" } }
              : { Sms: { body: "Demo SMS" } },
        },
      },
      metadata: {
        aggregate_id: notification.notification_id,
        sequence: 2,
        event_version: 1,
        timestamp: new Date(
          new Date(notification.created_at).getTime() + 30000,
        ).toISOString(),
        user_id: notification.user_id,
      },
    });
  }

  if (notification.status === "SENT" || notification.status === "DELIVERED") {
    events.push({
      event: {
        NotificationDispatched: {
          notification_id: notification.notification_id,
          external_id: notification.external_id || "ext-demo-123",
        },
      },
      metadata: {
        aggregate_id: notification.notification_id,
        sequence: 3,
        event_version: 1,
        timestamp: new Date(
          new Date(notification.created_at).getTime() + 60000,
        ).toISOString(),
        user_id: notification.user_id,
      },
    });
  }

  if (notification.status === "DELIVERED") {
    events.push({
      event: {
        NotificationDelivered: {
          notification_id: notification.notification_id,
        },
      },
      metadata: {
        aggregate_id: notification.notification_id,
        sequence: 4,
        event_version: 1,
        timestamp: new Date(
          new Date(notification.created_at).getTime() + 120000,
        ).toISOString(),
        user_id: notification.user_id,
      },
    });
  }

  if (notification.status === "FAILED") {
    events.push({
      event: {
        NotificationFailed: {
          notification_id: notification.notification_id,
          error: "Demo error: Service temporarily unavailable",
        },
      },
      metadata: {
        aggregate_id: notification.notification_id,
        sequence: 3,
        event_version: 1,
        timestamp: new Date(
          new Date(notification.created_at).getTime() + 90000,
        ).toISOString(),
        user_id: notification.user_id,
      },
    });
  }

  return events;
};

export const mockApiHandler = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  console.log("[Mock API]", options?.method || "GET", url);

  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 200),
  );

  const urlObj = new URL(url, window.location.origin);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  if (pathname === "/api/v1/notifications") {
    const limit = parseInt(searchParams.get("limit") || "10");
    const cursor = searchParams.get("cursor");
    const cursorIndex = cursor ? parseInt(cursor) : 0;

    const data = mockNotifications.slice(cursorIndex, cursorIndex + limit);
    const hasMore = cursorIndex + limit < mockNotifications.length;
    const nextCursor = hasMore ? String(cursorIndex + limit) : null;

    return new Response(
      JSON.stringify({
        data,
        has_more: hasMore,
        next_cursor: nextCursor,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (
    pathname.startsWith("/api/v1/notification/") &&
    !pathname.includes("/events/")
  ) {
    const notificationId = pathname.split("/").pop();
    const detail = getMockNotificationDetail(notificationId!);

    if (!detail) {
      return new Response(JSON.stringify({ error: "Notification not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(detail), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname.startsWith("/api/v1/notification/events/")) {
    const notificationId = pathname.split("/").pop();
    const events = getMockNotificationEvents(notificationId!);

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname.startsWith("/api/v1/notifications/activity/")) {
    const timescale = parseInt(pathname.split("/").pop() || "7");
    const activity = generateActivityData(timescale);

    return new Response(JSON.stringify(activity), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname === "/api/v1/contact-messages/") {
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const data = mockContactMessages.slice(offset, offset + limit);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname.startsWith("/api/v1/contact-messages/activity/")) {
    const timescale = parseInt(pathname.split("/").pop() || "7");
    const activity = generateActivityData(timescale);

    return new Response(JSON.stringify(activity), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    pathname === "/api/v1/admin/rebuild-activity" &&
    options?.method === "POST"
  ) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname === "/api/v1/admin/command" && options?.method === "POST") {
    console.log("[Mock API] Admin command executed:", options.body);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname.startsWith("/api/v1/") && options?.method === "POST") {
    console.log("[Mock API] Command executed:", pathname, options.body);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Command executed successfully (demo mode)",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  console.warn("[Mock API] Unknown endpoint:", pathname);
  return new Response(JSON.stringify({ error: "Endpoint not mocked" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
};

export const setupMockApi = () => {
  const originalFetch = window.fetch;

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    if (url.includes("/api/v1/") || url.includes("/cdn-cgi/access/")) {
      return mockApiHandler(url, init);
    }

    return originalFetch(input, init);
  };

  console.log("[Mock API] Initialized - all API calls will be intercepted");
};
